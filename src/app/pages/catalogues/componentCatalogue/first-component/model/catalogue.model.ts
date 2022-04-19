/**
 * Node for to-do item
 */
 export class TodoItemNode {
    children!: TodoItemNode[];
    item!: string;
  }


  export class SDCItem {
    id !: Number;
    name !:string;
    objectifs !:string;
    children!: SDCItem[]
  }




  /** Flat to-do item node with expandable and level information */
  export class TodoItemFlatNode {
    item!: string;
    level!: number;
    expandable!: boolean;
  }
  