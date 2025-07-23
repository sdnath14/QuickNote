import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#00FF9D20] bg-gradient-to-b from-[#121212] to-[#1a1a1a] p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/note/${note._id}`} className="block space-y-2">
        <h3 className="text-lg font-bold text-[#00FF9D] group-hover:underline">
          {note.title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-3">{note.content}</p>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-[#00FF9D20] pt-3 text-xs text-gray-400">
        <span>{formatDate(new Date(note.createdAt))}</span>

        {/* Icons that redirect to note detail */}
        <Link to={`/note/${note._id}`} className="flex gap-3 items-center">
          <PenSquareIcon className="w-4 h-4 text-green-400 hover:scale-110 transition" />
          <Trash2Icon className="w-4 h-4 text-red-400 hover:scale-110 transition" />
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
