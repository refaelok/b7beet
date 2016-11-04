export class routeController {
  constructor() {
    console.log('loading route module')
  }
  $onInit() {

  }
}

export default {
  name: 'route',
  component: {
    template: require('./route.html'),
    controller: [routeController],
  }
}
