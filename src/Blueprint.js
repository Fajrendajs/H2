import React, { Component } from 'react';
import { Button, Icon, Classes } from '@blueprintjs/core';
import { Colors } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

class Blueprint extends Component {
  render() {
    return (
      <div style={{ color: '#1F4B99', background: '#FFC940' }}>
        <Button
          className={Classes.POPOVER_OPEN}
          intent="success"
          text="Dismiss"
        />

        <Button icon="refresh" intent="danger" text="Reset" />
        <Button icon="user" rightIcon="caret-down" text="Profile settings" />
        <Button rightIcon="arrow-right" intent="success" text="Next step" />
        {/* <Icon> children as inline text elements */}
        <Button>
          <Icon icon="document" /> Upload... <Icon icon="small-cross" />
        </Button>
      </div>
    );
  }
}

export default Blueprint;
