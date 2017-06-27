import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/from';
import 'rxjs/add/Observable/empty';
import 'rxjs/add/Observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service= new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set the todos property with the items  returned from the server', () => {
    const todos= [1,2,3];
    spyOn(service, 'getTodos').and.callFake(()=> {
      return Observable.from([todos]);
    }); 

    component.ngOnInit();
    //expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos).toBe(todos);
 });

 it('should call a server to save a changes when a new todo item is added', () => {
   
   let spy= spyOn(service, 'add').and.callFake((todo)=>{
      return Observable.empty();

   });
   component.add();

   expect(spy).toHaveBeenCalled();
 });



  it('should add the new todo returned from the server', () => {
   let todo= {id:1 };
  //  let spy= spyOn(service, 'add').and.callFake((todo)=>{
  //     return Observable.from([todo]);

  //  });

  let spy= spyOn(service, 'add').and.returnValue(
    Observable.from([todo])
    );
   component.add();
    
   expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
 });

 it('should put the error in the message property when the server returns an error ', ()=>{
 let errorMessage= "Error from the server";
 let spy= spyOn(service, 'add').and.returnValue(
   Observable.throw(errorMessage));
   component.add();
   expect(component.message).toBe(errorMessage);
 });


it('should call the server to delete the todo item if the user confirms', ()=>{
 spyOn(window, 'confirm').and.returnValue(true);
 let spy= spyOn(service, 'delete').and.returnValue(
   Observable.empty()
   );
 component.delete(1);
 expect(spy).toHaveBeenCalledWith(1);

});


it('should NOT call the server to delete the todo item if the user cancels', ()=>{
 spyOn(window, 'confirm').and.returnValue(false);
 let spy= spyOn(service, 'delete').and.returnValue(
   Observable.empty()
   );
 component.delete(1);
 expect(spy).not.toHaveBeenCalled();

});

});