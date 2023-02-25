import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { IWorkspace } from 'src/app/models/workspace';
import { UsersService } from 'src/app/services/users.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { IUserCard } from 'src/app/models/user-card';
import { IIncident } from 'src/app/models/incidents';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  workspace: IWorkspace;
  user: IUser;

  cards: IUserCard[] = [];
  cards_isChecked = false;

  constructor(
    private usersService: UsersService,
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private cardsService: CardsService
  ) {}

  changeCards(event: any) {
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (event.target.checked) {
      const dto = {
        start: yesterday,
        end: today,
      };
      this.cardsService
        .getUserCards(this.user.id.toString(), dto)
        .subscribe((cards: IUserCard[]) => {
          this.cards = cards;
        });
    } else {
      const dto = {
        start: today,
        end: tomorrow,
      };
      this.cardsService
        .getUserCards(this.user.id.toString(), dto)
        .subscribe((cards: IUserCard[]) => {
          this.cards = cards;
        });
    }
  }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: today,
      end: tomorrow,
    };
    this.route.params.subscribe((params: Params) => {
      this.usersService.getUserById(params['id']).subscribe((user: IUser) => {
        this.user = user;
      });
      this.workspaceService
        .getWorkspaceByUserId(params['id'])
        .subscribe((workspace: IWorkspace) => {
          this.workspace = workspace;
        });
      this.cardsService
        .getUserCards(params['id'], dto)
        .subscribe((cards: IUserCard[]) => {
          this.cards = cards;
        });
    });
  }

  exportToExcel() {
    let element = document.getElementById('shift-log');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Журнал смен.xlsx');
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  // }
}
