import { Subject } from 'rxjs';

const subject = new Subject();

export const playerService = {
    sendPath: path => subject.next( path ),
    clearPaths: () => subject.next(),
    onPath: () => subject.asObservable()
};