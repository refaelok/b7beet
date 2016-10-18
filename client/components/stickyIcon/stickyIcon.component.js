export class StickyIconController {
  constructor() {
    const ctrl = this;
    ctrl.model = {
      icon: ctrl.baseIcon,
      color: ctrl.baseIconColor,
      size: ctrl.bothSize,
      isOn: true
    }
  }

  $onInit() {
    // TODO: implement later
  }

  toggle() {
    if (this.model.isOn) {
      this.model.icon = this.onToggleIcon
      this.model.color = this.onToggleSetColor
      this.model.isOn = false;
    } else {
      this.model.icon = this.baseIcon
      this.model.color = this.baseIconColor
      this.model.isOn = true;
    }
    this.onToggle({state: this.model.isOn})
  }
}

export default {
  component: {
    template: require('./stickyIcon.html'),
    controller: [StickyIconController],
    bindings: {
      baseIcon: '@',
      onToggleIcon: '@',
      baseIconColor: '@',
      onToggleSetColor: '@',
      bothSize: '@',
      onToggle: '&'
    }
  },
  name: 'stickyIcon'
}
