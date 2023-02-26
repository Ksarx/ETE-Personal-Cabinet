import {
  Component,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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
import * as XLSX from 'xlsx';
import { IncidentCardComponent } from 'src/app/components/incidents-card/incidents-card.component';
import { KpiCardComponent } from 'src/app/components/kpi-card/kpi-card.component';
import { EventsCardComponent } from 'src/app/components/events-card/events-card.component';
import { LabTestCardComponent } from 'src/app/components/lab-test-card/lab-test-card.component';
import { WorkData } from 'src/app/models/work-data';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCardsModalComponent } from 'src/app/components/delete-cards-modal/delete-cards-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { ShiftLogService } from 'src/app/services/shift-log.service';
import { ShiftStatusModalComponent } from 'src/app/components/shift-status-modal/shift-status-modal.component';

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

  active_cards: string[] = [];
  colors = ['#F56B00', '#C62828', '#E92064', '#03fca1', '#fcce03'];
  colorAvatar: string;

  shift_status = false;
  show_window = false;

  getColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  constructor(
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private dialogRef: MatDialog,
    private notifService: NotificationService,
    private shiftLogService: ShiftLogService
  ) {}

  receiveWarning(warning: string) {
    this.notifService.addNotify(warning);
  }

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

  receiveCard(card: string) {
    this.active_cards.push(card);
  }

  openSettings() {
    const dialog = this.dialogRef.open(DeleteCardsModalComponent, {
      data: this.active_cards,
      width: '500px',
    });
    dialog.afterClosed().subscribe((result: string) => {
      if (result) {
        const index = this.active_cards.indexOf(result);
        this.active_cards.splice(index, 1);
      }
    });
  }

  ngOnInit(): void {
    this.colorAvatar = this.getColor();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: today,
      end: tomorrow,
    };
    this.route.params.subscribe((params: Params) => {
      this.workspaceService
        .getWorkspaceByUserId(params['id'])
        .subscribe((data: WorkData) => {
          this.workspace = data.workspace;
          this.user = data.user;
          this.shiftLogService.startedShiftLog.subscribe((shifts) => {
            if (shifts.find((o) => o.userId === data.user.id)) {
              this.shift_status = true;
            } else {
              this.shift_status = false;
            }
          });
        });
      this.cardsService
        .getUserCards(params['id'], dto)
        .subscribe((cards: IUserCard[]) => {
          this.cards = cards;
        });
      this.workspaceService.currentActive.subscribe((data) => {
        this.active_cards = data;
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

  startShift() {
    this.shiftLogService.addShiftLog(this.user);
  }

  openShiftStatus() {
    const dialog = this.dialogRef.open(ShiftStatusModalComponent);
    dialog.afterClosed().subscribe((result: string) => {
      if (result) {
        this.shiftLogService.endShift(this.user.id, this.workspace.id, result);
      }
    });
  }

  openInNewWindow() {
    this.show_window = !this.show_window;
  }
}
