export interface ITodo {
  id?: string;
  title: string;
  body?: string;
  complete: boolean | undefined;
  createAt?: string;
  userId?:string
 
}
export interface ISendTodo {
  id: string;
  title: string;
  body?: string;
  complete: boolean ;
  userId:string
 
}


