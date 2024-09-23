import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notesService } from 'src/services/notes.service';
import { Note } from '../Note';
import classes from './notes.module.scss';

export const Notes = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes'],
        queryFn: notesService.getAll,
    });

    const handleAddNote = async () => {
        await notesService.create('New note');
        queryClient.invalidateQueries({
            queryKey: ['notes'],
        });
    };

    return (
        <div className={classes.container}>
            <header>
                <h1>My notes</h1>
                <button onClick={handleAddNote}>Add note</button>
            </header>
            <main>
                {isLoading && <div>loading...</div>}
                {isError && <div>Error occurred</div>}
                {data?.map((note) => (
                    <Note key={note._id.toString()} {...note} />
                ))}
            </main>
        </div>
    );
};
