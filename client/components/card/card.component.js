export class CardController{
  constructor(data) {
    this.card = data;
  }

  $onInit() {
    // TODO: implement later
  }

  $onChanges(changesObj) {
    this.card = changesObj.currentValue;
  }

  onCloseRequest() {
    this.onClose({oldCard: this.data})
  }



}

export default {
  component: {
    template: require('./card.html'),
    controller: [CardController],
    bindings: {
      data: '<',
      onClose: '&'
    }
  },
  name: 'card'
}
