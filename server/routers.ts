import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createRsvp, getAllRsvps, getTotalGuestsCount } from "./rsvp-db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // RSVP management router
  rsvp: router({
    // Public endpoint - anyone can submit RSVP
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("Email inválido"),
          phone: z.string().optional(),
          guestsCount: z.number().int().min(1, "Número de convidados deve ser pelo menos 1"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createRsvp(input);
        return { success: true };
      }),

    // Admin endpoint - requires authentication and admin role
    list: protectedProcedure.query(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Acesso negado. Apenas administradores podem ver RSVPs.",
        });
      }
      return await getAllRsvps();
    }),

    // Admin endpoint - get total guests count
    totalGuests: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Acesso negado.",
        });
      }
      return await getTotalGuestsCount();
    }),
  }),
});

export type AppRouter = typeof appRouter;
