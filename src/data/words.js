export const categorias = [
  {
    nombre: 'Animales',
    palabras: ['ELEFANTE', 'MARIPOSA', 'COCODRILO', 'JIRAFA', 'PINGÜINO', 'DELFIN', 'TIGRE', 'TORTUGA', 'CAMELLO', 'MURCIÉLAGO']
  },
  {
    nombre: 'Países',
    palabras: ['COLOMBIA', 'ARGENTINA', 'VENEZUELA', 'ECUADOR', 'PARAGUAY', 'URUGUAY', 'BOLIVIA', 'PANAMA', 'CHILE', 'MEXICO']
  },
  {
    nombre: 'Frutas',
    palabras: ['MANGO', 'PAPAYA', 'GUAYABA', 'MARACUYA', 'ZAPOTE', 'LULO', 'CARAMBOLO', 'PITAYA', 'TAMARINDO', 'UCHUVA']
  },
  {
    nombre: 'Profesiones',
    palabras: ['INGENIERO', 'ARQUITECTO', 'ASTRONAUTA', 'VETERINARIO', 'CARPINTERO', 'FOTÓGRAFO', 'GEÓGRAFO', 'BOMBERO', 'PILOTO', 'CHEF']
  },
  {
    nombre: 'Tecnología',
    palabras: ['COMPUTADORA', 'INTERNET', 'ALGORITMO', 'SOFTWARE', 'SERVIDOR', 'TECLADO', 'MONITOR', 'SMARTPHONE', 'BLUETOOTH', 'SATÉLITE']
  }
]

export function getPalabraAleatoria() {
  const cat = categorias[Math.floor(Math.random() * categorias.length)]
  const palabra = cat.palabras[Math.floor(Math.random() * cat.palabras.length)]
  return { palabra, categoria: cat.nombre }
}
