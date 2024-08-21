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
        await notesService.create('פתק חדש');
        queryClient.invalidateQueries({
            queryKey: ['notes'],
        });
    };

    return (
        <div className={classes.container}>
            <header>
                <h1>הפתקים שלי</h1>
                <button onClick={handleAddNote}>הוספת פתק</button>
            </header>
            <main>
                {isLoading && <div>טוען...</div>}
                {isError && <div>אירעה שגיאה</div>}
                {data?.map((note) => (
                    <Note key={note._id.toString()} {...note} />
                ))}
            </main>
        </div>
    );
};

export const HelloWorld = () => <div>Akiva test</div>;
