import type { ImageMetadata } from "astro";

// Fotos individuales de cada integrante: se cargan solas desde
// src/assets/musicians/ (igual que las fotos de conciertos), sin un
// import por foto. Deja el archivo ahi y referencialo por nombre con
// musicianImage("archivo.jpg") abajo. Si un integrante no trae `image`,
// su tarjeta y su ficha muestran un bloque placeholder etiquetado
// ("Fotografía pendiente"), nunca una foto generica.
const musicianImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/musicians/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

function musicianImage(filename: string) {
  const entry = Object.entries(musicianImages).find(([path]) =>
    path.endsWith("/" + filename),
  );
  return entry?.[1].default;
}

export interface Musician {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: ImageMetadata;
}

// Placeholder: reemplaza nombre, instrumento, bio y slug de cada
// integrante real. El slug define la URL de su ficha
// (/sobre-nosotros/[slug]).
export const musicians: Musician[] = [
  {
    slug: "Juan Torres",
    name: "Juan Torres",
    role: "Violinista",
    bio: "Juan Sebastián Torres Castro (Bogotá, 2002) es estudiante de Música Instrumental con énfasis en violín, y adelanta estudios de doble titulación en Administración de Empresas en la Universidad Nacional de Colombia. Inició su carrera musical a la edad de 13 años, en 2015, en el programa 40x40 de la Orquesta Filarmónica de Bogotá, en el Colegio Distrital Juan Lozano y Lozano, donde comenzó su proceso musical e integró posteriormente distintas agrupaciones del sistema. Fue miembro de la Orquesta Filarmónica Infantil de Bogotá, con la que participó en un side by side con la National Youth Orchestra of the United States of America en el Teatro Mayor Julio Mario Santo Domingo en 2017, año en el que también debutó como solista en este mismo escenario. Posteriormente integró la Orquesta Filarmónica Prejuvenil de Bogotá, presentándose en distintos escenarios de relevancia de la ciudad. En 2019 inició sus estudios en el Programa Básico del Conservatorio de Música de la Universidad Nacional de Colombia bajo la tutoría del maestro Luis Darío Baracaldo, y en 2020 continuó su formación con la maestra Liz Ángela García Castro, con quien desarrolló la mayor parte de su proceso en el pregrado, al que ingresó en 2021. Actualmente, en la etapa final de su formación, estudia bajo la guía del violinista Juan Carlos Higuita. Desde 2022 ha formado parte de la Filarmónica Joven de Colombia en distintas temporadas, donde ha trabajado con directores como Andrés Orozco-Estrada y con talleristas provenientes de orquestas como la Mahler Chamber Orchestra, la Gürzenich-Orchester Köln y la Houston Symphony. En este contexto, se ha presentado en escenarios de relevancia internacional como la Elbphilharmonie, el Concertgebouw de Ámsterdam, el Konzerthaus de Viena, la Berliner Philharmonie y la Philharmonie de París, entre otros, destacando su participación junto a la Orquesta de la Escuela Superior de Música Reina Sofí, en su debut en el Carnegie Hall de Nueva York. Asimismo, ha participado en conciertos en los que han sido invitados solistas como Hilary Hahn, Renaud Capuçon, las hermanas Labèque, entre otros. En 2024 fue solista junto a la Orquesta Sinfónica del Conservatorio de Música de la Universidad Nacional de Colombia en el Auditorio León de Greiff. Su interés por la música de cámara lo ha llevado a participar en la Camerata de Cuerdas de la Filarmónica Joven de Colombia y a colaborar con el Quatuor Debussy, así como a impulsar propuestas interdisciplinares que integran música y performance, entre ellas el colectivo El Tiempo No Será Más, fundado junto a sus amigos más cercanos. Paralelamente, ha desarrollado un interés por la gestión cultural, siendo becario del programa Líderes Emprendedores del Global Leaders Institute, experiencia que reafirmó su decisión de estudiar Administración de Empresas desde una perspectiva de la gestión y administración cultural. Actualmente es cofundador de un estudio de diseño visual llamado Estudio Figurante junto a su mejor amigo.",
    image: musicianImage("juan.jpg"),
  },
  {
    slug: "Sara Alvarez",
    name: "Sara Alvarez",
    role: "Violonchelo",
    bio: "Biografía pendiente: una o dos frases sobre su formación y trayectoria.",
    image: musicianImage("sara.jpg"),
  },
  {
    slug: "Miguelangel Villanueva",
    name: "Miguelangel Villanueva",
    role: "Clarinete",
    bio: "Biografía pendiente: una o dos frases sobre su formación y trayectoria.",
    image: musicianImage("miguelw.jpg"),
  },
  {
    slug: "Esteban Espitia",
    name: "Esteban Espitia",
    role: "Pianista",
    bio: "Nacido en Bogotá, Colombia en 2002, inició sus estudios musicales en 2018 en el Curso Básico de Estudios Musicales de la Universidad Nacional de Colombia. En 2020 comenzó la carrera de Música Instrumental con énfasis en piano bajo la dirección de la maestra Ángela Rodríguez, y desde 2021 continuó su formación con el maestro Mac McClure, con quien culminó sus estudios de pregrado. Actualmente cursa la Maestría en Interpretación y Pedagogía Musical en la misma universidad, también bajo la guía del maestro McClure. Ha participado en diversos eventos culturales, entre ellos la VII Semana del Piano de Sopó, la VIII Semana de la Música en Funza y la Primera Maratón de Pianistas-Compositoras de Hispanoamérica y España organizada por FIMTE (Festival Internacional de Música de Tecla Española). Fue ganador del segundo lugar en la primera edición del concurso Historias del Piano Colombiano Luis Antonio Calvo, obtuvo una beca para asistir al IX Festival Internacional de Piano Suprematismo Sonoro del Conservatorio del Tolima y también participo en el festival Interharmony Summer Music Festival en Acqui Terme, Italia. Ha recibido clases magistrales de pianistas como Giorgi Latso, Mihai Vatca y Adam Kent, y se ha presentado en escenarios como los auditorios Teresa Cuervo Borda, Olav Roots y Guillermo Uribe Holguín.",
    image: musicianImage("esteban.jpg"),
  },
];
