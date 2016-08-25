export class eventController {
  constructor() {
  }
  $onInit() {
  }
}

export default {
  name: 'event',
  component: {
    template: require('./event.html'),
    controller: [eventController],
  }
}
