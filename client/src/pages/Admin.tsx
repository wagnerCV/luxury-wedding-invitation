import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { Download, LogOut, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "guests">("date");

  // Fetch RSVPs
  const { data: rsvps, isLoading: rsvpsLoading } = trpc.rsvp.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: totalGuests } = trpc.rsvp.totalGuests.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Filter and sort RSVPs
  const filteredAndSortedRsvps = useMemo(() => {
    if (!rsvps) return [];

    let filtered = rsvps.filter(
      (rsvp) =>
        rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "guests":
          return b.guestsCount - a.guestsCount;
        case "date":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [rsvps, searchTerm, sortBy]);

  // Export to CSV
  const exportToCSV = () => {
    if (!rsvps || rsvps.length === 0) {
      toast.error("Nenhum RSVP para exportar");
      return;
    }

    const headers = ["Nome", "Email", "Telefone", "Nº Convidados", "Mensagem", "Data"];
    const rows = rsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.phone || "",
      rsvp.guestsCount.toString(),
      rsvp.message || "",
      format(new Date(rsvp.createdAt), "dd/MM/yyyy HH:mm"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `rsvps-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    toast.success("CSV exportado com sucesso!");
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mx-auto mb-4"></div>
          <p className="text-inkblack/60">A carregar...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-playfair text-3xl text-emerald">
              Painel Administrativo
            </CardTitle>
            <CardDescription>
              Faça login para aceder à gestão de RSVPs
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-emerald hover:bg-emerald/90"
            >
              Iniciar Sessão
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-playfair text-3xl text-burgundy">
              Acesso Negado
            </CardTitle>
            <CardDescription>
              Apenas administradores podem aceder a esta página
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-inkblack/60">
              Utilizador atual: {user?.name || user?.email}
            </p>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Terminar Sessão
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-sand/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl text-emerald">
              Painel Administrativo
            </h1>
            <p className="text-sm text-inkblack/60">Jorge Borges & Ana Oliveira</p>
          </div>
          <Button
            onClick={() => logout()}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de RSVPs</CardDescription>
              <CardTitle className="text-4xl font-playfair text-emerald">
                {rsvps?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Convidados</CardDescription>
              <CardTitle className="text-4xl font-playfair text-burgundy">
                {totalGuests || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Média por RSVP</CardDescription>
              <CardTitle className="text-4xl font-playfair text-amber">
                {rsvps && rsvps.length > 0
                  ? ((totalGuests || 0) / rsvps.length).toFixed(1)
                  : "0"}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-inkblack/40 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-sand/30 rounded-md bg-white text-sm"
                >
                  <option value="date">Ordenar por Data</option>
                  <option value="name">Ordenar por Nome</option>
                  <option value="guests">Ordenar por Nº Convidados</option>
                </select>

                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="gap-2"
                  disabled={!rsvps || rsvps.length === 0}
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* RSVPs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald" />
              Confirmações de Presença
            </CardTitle>
            <CardDescription>
              {filteredAndSortedRsvps.length} de {rsvps?.length || 0} RSVPs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rsvpsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mx-auto mb-4"></div>
                <p className="text-inkblack/60">A carregar RSVPs...</p>
              </div>
            ) : filteredAndSortedRsvps.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-inkblack/20 mx-auto mb-4" />
                <p className="text-inkblack/60">
                  {searchTerm ? "Nenhum RSVP encontrado" : "Ainda não há RSVPs"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead className="text-center">Convidados</TableHead>
                      <TableHead>Mensagem</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedRsvps.map((rsvp) => (
                      <TableRow key={rsvp.id}>
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell className="text-sm text-inkblack/70">
                          {rsvp.email}
                        </TableCell>
                        <TableCell className="text-sm text-inkblack/70">
                          {rsvp.phone || "—"}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald/10 text-emerald font-semibold text-sm">
                            {rsvp.guestsCount}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-inkblack/70">
                          {rsvp.message || "—"}
                        </TableCell>
                        <TableCell className="text-sm text-inkblack/70 whitespace-nowrap">
                          {format(new Date(rsvp.createdAt), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
