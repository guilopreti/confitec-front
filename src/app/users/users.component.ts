import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from './user';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: Usuario[] = [];

  editUserModalVisible = false;
  userToEdit: Usuario = {
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: new Date(),
    escolaridade: '',
    isDelted: false,
  };

  deleteUserModalVisible = false;
  userToDelete: Usuario | null = null;

  escolaridadeOptions = ['Infantil', 'Fundamental', 'Médio', 'Superior'];

  newUser = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    escolaridade: '',
  };
  createUserModalVisible = false;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((response: Object) => {
      console.log(response);
      if (Array.isArray(response)) {
        this.users = response;
      } else {
        console.error('Resposta inválida');
      }
    });
  }

  openEditUserModal(user: Usuario) {
    this.userToEdit = { ...user };
    this.editUserModalVisible = true;
  }

  closeEditUserModal() {
    this.editUserModalVisible = false;
    this.userToEdit = {
      id: 0,
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: new Date(),
      escolaridade: '',
      isDelted: false,
    };
  }

  confirmeEditUser() {
    if (this.userToEdit) {
      this.service.updateUser(this.userToEdit).subscribe((response) => {
        console.log('Usuário atualizado: ', response);
        this.closeEditUserModal();
      });
    }
  }

  openDeleteUserModal(user: Usuario) {
    this.userToDelete = user;
    this.deleteUserModalVisible = true;
  }

  closeDeleteUserModal() {
    this.deleteUserModalVisible = false;
    this.userToDelete = null;
  }

  confirmDeleteUser() {
    if (this.userToDelete) {
      this.service.deleteUser(this.userToDelete.id).subscribe((response) => {
        console.log('Usuário deletado: ', response);
        this.closeDeleteUserModal();
      });
    }
  }

  openCreateUserModal() {
    this.createUserModalVisible = true;
  }

  closeCreateUserModal() {
    this.createUserModalVisible = false;
  }

  confirmCreateUser() {
    this.service.createUser(this.newUser).subscribe((response) => {
      console.log('Novo usuário criado: ', response);
      this.closeCreateUserModal();
    });
  }
}
