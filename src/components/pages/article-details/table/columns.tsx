import {ColumnDef} from "@tanstack/react-table";
import {Comments} from "@/types";

export const columns: ColumnDef<Comments>[] = [
   {
      accessorKey: "id",
      header: "ID",
   },
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "email",
      header: "Email",
   },
   {
      accessorKey: "body",
      header: "Comments",
   },
];