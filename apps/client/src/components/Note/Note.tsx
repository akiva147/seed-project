import { Note as NoteType } from '@seed-project/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { notesService } from 'src/services/notes.service';
import classes from './note.module.scss';
import { convertEmailDisplayNameToUppercasedName } from './note.utils';
export type NoteProps = NoteType;

export const Note = ({ content, createdAt, _id, createdBy }: NoteProps) => {
    const [noteContent, setNoteContent] = useState(content);
    const queryClient = useQueryClient();

    const handleDeleteNote = async () => {
        await notesService.delete(_id);
        queryClient.invalidateQueries({
            queryKey: ['notes'],
        });
    };

    const { mutateAsync: mutateNote, isPending } = useMutation({
        mutationKey: ['updateNote'],
        mutationFn: notesService.update,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteContent(e.target.value);
    };

    const handleUpdateNote = async () =>
        await mutateNote({
            _id,
            content: noteContent,
        });

    const displayName = convertEmailDisplayNameToUppercasedName(createdBy.name);

    return (
        <div className={classes.container}>
            <header>
                <button onClick={handleDeleteNote}>X</button>
            </header>
            <main>
                <textarea value={noteContent} onChange={onChange} />
                <time>{createdAt.toLocaleDateString()}</time>
                <span>{displayName}</span>

                {content !== noteContent && (
                    <button onClick={handleUpdateNote}>
                        {isPending ? 'מעדכן...' : 'עדכון'}
                    </button>
                )}
            </main>
        </div>
    );
};
