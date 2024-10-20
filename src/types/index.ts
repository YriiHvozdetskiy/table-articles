export interface Posts {
   id: number;
   title: string;
   body: string;
   commentCount: number
}

export interface Comments {
   id: number
   name: string
   email: string
   body: string
}