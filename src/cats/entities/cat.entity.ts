import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Breed } from '../../breeds/entities/breed.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Cat {
  // @PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  deletedAt: Date;

  // Define una relación ManyToOne con la entidad 'Breed'
  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true, // para que traiga las raza al hacer un findOne
  })
  breed: Breed;

  // Define una relación ManyToOne con la entidad 'User'
  @ManyToOne(() => User)
  // Usa 'JoinColumn' para especificar que esta relación se une a la columna 'userEmail'
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
  user: User;

   // Define una columna 'userEmail' para almacenar el correo electrónico del usuario asociado
  @Column()
  userEmail: string;

}