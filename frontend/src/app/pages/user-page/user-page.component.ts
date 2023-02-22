import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { IWorkspace } from 'src/app/models/workspace';
import { UsersService } from 'src/app/services/users.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  user: IUser | undefined;
  workspace: IWorkspace | undefined;
  cards: string[] = [];
  showPortal = false;

  constructor(
    private usersService: UsersService,
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getUserById(params['id']);
      this.getWorkspaceByUserId(params['id']);
    });
  }

  getUserById(id: string) {
    this.usersService
      .getUserById(id)
      .subscribe((user: IUser) => (this.user = user));
  }

  getWorkspaceByUserId(id: string) {
    this.workspaceService
      .getWorkspaceByUserId(id)
      .subscribe((workspace: IWorkspace) => {
        if (workspace.incidents.length != 0) {
          this.cards.push('incidents');
        }
        if (workspace.events.length != 0) {
          this.cards.push('events');
        }
        if (workspace.lab_tests.length != 0) {
          this.cards.push('lab_tests');
        }
        if (workspace.kps.length != 0) {
          this.cards.push('kps');
        }
        this.workspace = workspace;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
}
