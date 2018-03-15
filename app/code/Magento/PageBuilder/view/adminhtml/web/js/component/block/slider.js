/*eslint-disable */
define(["../../utils/delayed-promise", "../block/factory", "../config", "../event-bus", "./block"], function (_delayedPromise, _factory, _config, _eventBus, _block) {
  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  var Slider =
  /*#__PURE__*/
  function (_Block) {
    _inheritsLoose(Slider, _Block);

    function Slider() {
      return _Block.apply(this, arguments) || this;
    }

    var _proto = Slider.prototype;

    /**
     * Add a slide into the slider
     */
    _proto.addSlide = function addSlide() {
      var _this = this;

      // Set the active slide to the index of the new slide we're creating
      this.preview.data.activeSlide(this.children().length);
      (0, _factory)(_config.getInitConfig("content_types").slide, this, this.stage).then((0, _delayedPromise)(300)).then(function (slide) {
        _this.addChild(slide, _this.children().length);

        slide.edit.open();
      });
    };
    /**
     * Bind events for the current instance
     */


    _proto.bindEvents = function bindEvents() {
      var _this2 = this;

      _Block.prototype.bindEvents.call(this); // Block being mounted onto container


      _eventBus.on("slider:block:ready", function (event, params) {
        if (params.id === _this2.id && _this2.children().length === 0) {
          _this2.addSlide();
        }
      }); // Block being removed from container


      _eventBus.on("block:removed", function (event, params) {
        if (params.parent.id === _this2.id) {
          // Mark the previous slide as active
          if (params.index > 0) {
            _this2.preview.navigateToSlide(params.index - 1);
          } else {
            _this2.preview.navigateToSlide(0);
          }
        }
      });
    };

    return Slider;
  }(_block);

  return Slider;
});
//# sourceMappingURL=slider.js.map
