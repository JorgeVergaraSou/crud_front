interface Cat {
    id: number;
    breedId: number;
    name: string;
    age: number;
    deletedAt?: Date | null; // El campo puede ser opcional si puede ser nulo
    userEmail: string;
  }
  