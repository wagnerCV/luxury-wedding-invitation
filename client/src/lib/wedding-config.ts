/**
 * Wedding Event Configuration
 * Update these values with actual wedding details
 */

export const WEDDING_CONFIG = {
  // Couple Names
  bride: "Sofia",
  groom: "Miguel",
  
  // Event Details
  date: new Date("2025-09-20T18:00:00"), // September 20, 2025 at 6:00 PM
  venue: {
    name: "Quinta da Aveleda",
    address: "Rua da Aveleda, 4560-570 Penafiel, Portugal",
    coordinates: { lat: 41.2082, lng: -8.2805 },
  },
  
  // Ceremony & Reception
  ceremony: {
    time: "18:00",
    location: "Jardim da Quinta",
  },
  reception: {
    time: "20:00",
    location: "Salão Principal",
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
    text: "No meio de tantas pessoas, os nossos olhares encontraram-se. E nesse momento, soubemos que o amor verdadeiro existe.",
    author: "Sofia & Miguel",
  },
  
  // Spotify Playlist
  spotifyPlaylistId: "37i9dQZF1DX4sWSpwq3LiO", // Replace with actual playlist ID
  
  // RSVP
  rsvp: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Replace with actual Formspree endpoint
    deadline: new Date("2025-08-20T23:59:59"), // RSVP deadline
  },
  
  // Gallery Images
  gallery: [
    { src: "/images/couple-1.jpg", alt: "Sofia e Miguel - Retrato" },
    { src: "/images/couple-2.jpg", alt: "Sofia e Miguel - Momento Romântico" },
    { src: "/images/couple-3.webp", alt: "Sofia e Miguel - Celebração" },
    { src: "/images/couple-4.webp", alt: "Sofia e Miguel - Venue" },
    { src: "/images/venue-1.jpg", alt: "Quinta da Aveleda - Salão" },
    { src: "/images/details-1.jpg", alt: "Detalhes da Decoração" },
    { src: "/images/details-2.jpg", alt: "Mesa de Celebração" },
    { src: "/images/details-3.jpg", alt: "Arranjos Florais" },
  ],
};
