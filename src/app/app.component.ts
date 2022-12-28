import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { taskModel } from './model';
// import { CreateDialogComponent } from './create-dialog/create-dialog.component';
interface TaskStatus{
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-management-system';
  displayFormDialog: boolean = false;
  taskModel= new taskModel();
  selectedPriority: any= null;
  priorities: any[] = [{name: 'Low', key: 'Low'}, {name: 'Medium', key: 'Medium'}, {name: 'High', key: 'High'}];
  statusList: TaskStatus[] = [
    {name: 'To-do', code: 'To-do'},
    {name: 'In-Progress', code: 'inProgress'},
    {name: 'Done', code: 'done'}
];



taskStatus?: TaskStatus;
  // taskForm? : FormGroup;
  taskForm = this.formBuilder.group({
    id: [this.taskModel.id],
    title : [this.taskModel.title,[Validators.required, Validators.maxLength(100)]],
      description : [this.taskModel.description,[Validators.required, Validators.maxLength(150)]],
      priority : [this.taskModel.priority,[Validators.required]],
      startDate : [this.taskModel.startDate,[Validators.required]],
      endDate : [this.taskModel.endDate,[Validators.required]],
      status : [this.taskModel.status,[Validators.required]],
      assignedPerson: [this.taskModel.assignedPerson,[Validators.required]]
  });
  constructor(
    private formBuilder: FormBuilder
  ){}
  ngOnInit(){
    this.prepareform(new taskModel());
  }

  taskData:any = [];
  create: boolean = true;
  index: number = 0;
  toDoList: any=[];
  id:number = 0;
  dialogTitle: string = "";
  editDisabled: boolean = false;
  submitButton: string = "submit";

  prepareform(taskModel: taskModel){
   this.taskForm = this.formBuilder.group({
      id: [taskModel.id],
      title : [taskModel.title,[Validators.required, Validators.maxLength(100)]],
      description : [taskModel.description,[Validators.required, Validators.maxLength(150)]],
      priority : [taskModel.priority,[Validators.required]],
      startDate : [taskModel.startDate,[Validators.required]],
      endDate : [taskModel.endDate,[Validators.required]],
      status : [taskModel.status,[Validators.required]],
      assignedPerson: [taskModel.assignedPerson,[Validators.required]]
    });
  }

  submit(){
    if(this.create){
      // this.taskForm.controls.status.setValue(this.taskStatus?.code);
      this.taskForm.controls.id.setValue(this.id + 1);
      this.taskData.push(this.taskForm?.value);
      this.taskData = [...this.taskData];

    }else{
      this.taskData[this.index] = this.taskForm?.value;
    }
    this.displayFormDialog = false;
    this.prepareform(new taskModel());

  }

  details(id: number){
    let detailValue = this.taskData.filter((dt: { id: number; })=>{
      return dt.id == id;
    });
    this.dialogTitle = "Details of Task" + detailValue.title;
    this.editDisabled = true;
    this.prepareform(detailValue);
    this.create = false;
    this.submitButton = "update";
    this.displayFormDialog = true;
  }

  createTask(){
    this.dialogTitle = "Create Task"
    this.displayFormDialog = true;
    this.create = true;
  }
}
