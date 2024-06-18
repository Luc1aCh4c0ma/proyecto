import { Cat } from 'src/cats/entities/cat.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Breed {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  // Decorador '@OneToMany' establece una relación uno-a-muchos con la entidad 'Cat'
  // La función '() => Cat' especifica la entidad relacionada
  // La función '(cat) => cat.breed' define el campo en la entidad 'Cat' que contiene la relación inversa
  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}