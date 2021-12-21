import { io } from 'socket.io-client';
import { Component } from '../ui';

const Notifications = function Notifications(options = {}) {
  let viewer;
  return Component({
    name: 'notifications',
    onAdd(evt) {
      viewer = evt.target;
      const map = viewer.getMap();
      const socket = io(options.webSocketEndpoint);

      // Listen to a redraw event from server and trigger a refresh of
      // relevant WFS-layer
      socket.on('redraw-layer', (layerToReload) => {
        const layers = map.getLayers();
        layers.forEach(layer => {
          const layerProperties = layer.getProperties();
          if (layerProperties.sourceName === layerToReload.sourceName && layerProperties.name === layerToReload.name) {
            layer.getSource().refresh();
          }
        });
      });

      this.render();
    },
    onInit() {
    },
    render() {
      this.dispatch('render');
    }
  });
};

export default Notifications;
