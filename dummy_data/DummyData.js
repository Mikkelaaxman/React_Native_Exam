import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';
import User from '../models/User';



export const Users = [
    new User('1', 'Peter Møller', 'Jensen', 'dummyUrlLink'),
    new User('2', 'Lasse', 'Stausgaard', 'dummyUrlLink'),
    new User('3', 'Lasse', 'Vestergaard', 'dummyUrlLink'),
];

export const Messages = [
    new Message('1', 'Hello, where is everyone?', new Date(2021, 0, 1, 12, 10, 5), Users[0]),
    new Message('2', 'I am here', new Date(2021, 0, 1, 12, 15, 5), Users[1]),
    new Message('3', 'Stfu Lasse', new Date(2021, 0, 1, 12, 15, 5), Users[0]),
    new Message('4', 'I am speechless', new Date(2021, 0, 1, 12, 15, 5), Users[1]),
];

export const ChatRooms = [
    new ChatRoom('1', require('./../assets/ac99082f65d5c636e14e70785817899e.png'), 'CBS Surf', Messages),
    new ChatRoom('2', require('./../assets/ac99082f65d5c636e14e70785817899e.png'), 'CBS Feminist Society', []),
    new ChatRoom('3', require('./../assets/ac99082f65d5c636e14e70785817899e.png'), 'CBS Students', []),
];