/**
 * Wedding Event Configuration
 * Update these values with actual wedding details
 */

export const WEDDING_CONFIG = {
  // Couple Names
  bride: "Jorge Borges",
  groom: "Ana Oliveira",
  
  // Event Details
  date: new Date("2026-09-05T10:00:00"), // September 5, 2026 at 10:00 AM
  venue: {
    name: "Igreja de São Francisco Xavier da Caparica",
    address: "Rua das Quintas 7 11, 2825-171, Caparica",
    coordinates: { lat: 38.6602, lng: -9.2297 },
  },
  
  // Ceremony & Reception
  ceremony: {
    time: "10:00",
    location: "Igreja de São Francisco Xavier",
  },
  reception: {
    time: "13:00",
    location: "Salão de Festas",
  },
  
  // Dress Code
  dressCode: {
    title: "Elegância Formal",
    description: "Convidamos os nossos queridos a vestirem-se com elegância e sofisticação. Sugerimos tons de outono em harmonia com a paleta do evento.",
    colors: [
      { name: "Esmeralda", hex: "#0F766E" },
      { name: "Bordô", hex: "#7C1D2F" },
      { name: "Laranja Queimado", hex: "#B45309" },
      { name: "Âmbar", hex: "#F59E0B" },
      { name: "Areia", hex: "#D6BFA8" },
    ],
  },
  
  // Love Quote
  quote: {
    text: "O amor é paciente, o amor é bondoso.\nNão inveja, não se vangloria, não se orgulha.\nNão maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.\nO amor não se alegra com a injustiça, mas se alegra com a verdade.\nTudo sofre, tudo crê, tudo espera, tudo suporta.",
    author: "Jorge Borges & Ana Oliveira",
  },
  
  // Spotify Playlist
  spotifyPlaylistId: "37i9dQZF1DX4sWSpwq3LiO", // Replace with actual playlist ID
  
  // RSVP
  rsvp: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Replace with actual Formspree endpoint
    deadline: new Date("2026-08-05T23:59:59"), // RSVP deadline
  },
  
  // Gallery Images
  gallery: [
    { src: "/images/couple-1.jpg", alt: "Jorge e Ana - Retrato" },
    { src: "/images/couple-2.jpg", alt: "Jorge e Ana - Momento Romântico" },
    { src: "/images/couple-3.webp", alt: "Jorge e Ana - Celebração" },
    { src: "/images/couple-4.webp", alt: "Jorge e Ana - Venue" },
    { src: "/images/venue-1.jpg", alt: "Igreja de São Francisco Xavier - Interior" },
    { src: "/images/details-1.jpg", alt: "Detalhes da Decoração" },
    { src: "/images/details-2.jpg", alt: "Mesa de Celebração" },
    { src: "/images/details-3.jpg", alt: "Arranjos Florais" },
  ],
};
