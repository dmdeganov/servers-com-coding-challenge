import {http, HttpResponse, delay} from 'msw';
import {messages} from './fixtures/messages';
import dayjs from 'dayjs';
import {authors} from './fixtures/authors';

export const handlers = [
  http.get('/api/messages', async ({request}) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const authorId = Number(url.searchParams.get('authorId'));
    const text = url.searchParams.get('text');
    await delay(500);
    return HttpResponse.json({
      messages: getFilteredMessages(text, date, authorId),
      minDate: messages[0].time,
      maxDate: messages[messages.length - 1].time,
    });
  }),

  http.get('/api/authors', async () => {
    await delay(500);
    return HttpResponse.json({
      authors: authors.map(author => ({id: author.id, label: author.name})),
    });
  }),

  http.get('/api/author/:id', async ({request, params}) => {
    const {id} = params;
    await delay(500);
    return HttpResponse.json(authors.find(author => author.id === Number(id)));
  }),

  http.post('/api/new-message', async ({request}) => {
    const {text, authorId} = (await request.json()) as {text: string; authorId: number};
    messages.push({
      id: messages.length + 1,
      time: dayjs().unix(),
      text,
      authorId,
      authorName: authors.find(author => author.id === authorId)!.name,
    });

    await delay(500);
    return HttpResponse.json({
      messages,
      minDate: messages[0].time,
      maxDate: messages[messages.length - 1].time,
    });
  }),
];

const getFilteredMessages = (text: string | null, date: string | null, authorId: number) => {
  let filteredMessages = messages;
  if (text) {
    filteredMessages = filteredMessages.filter(message => message.text.includes(text));
  }
  if (authorId) {
    filteredMessages = filteredMessages.filter(message => message.authorId === authorId);
  }
  if (date) {
    filteredMessages = filteredMessages.filter(message => dayjs.unix(message.time).format('MM-DD-YYYY') === date);
  }
  return filteredMessages;
};
