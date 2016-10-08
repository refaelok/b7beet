export class LoaderController{
  constructor() {
  }

  $onInit() {
    // TODO: implement later
  }

  $onChanges(changesObj) {
  }

}

export default {
  component: {
    template: require('./loader.html'),
    controller: [LoaderController],
    bindings: {

    }
  },
  name: 'loader'
}
