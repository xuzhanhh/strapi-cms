/**
 *
 * WysiwygInlineControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Wrapper from './Wrapper';
import Popover from 'antd/es/popover'
import AntdButton from 'antd/es/button';
import 'antd/dist/antd.css'
import acStyles from '../acfun/ac.css'
import { name, ACImageMap } from '../acfun/constant'

class ACButton extends React.Component {
  handleClick = (e) => {
    e.preventDefault();

    if (!this.props.disabled && !this.props.customDisable) {
      this.props.handlers[this.props.handler](this.props.text, this.props.style);
    }
  }

  render() {
    return (
      <Popover style={{ zIndex: 9999 }} overlayStyle={{ zIndex: 9999 }} content={<div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'scroll', width: 600, height: 500 }}>
        {name.map(icon => <div onClick={
          () => {
            this.props.handlers[this.props.handler](`<img src="${ACImageMap[icon]}" />`, this.props.style);
          }
        }
          style={{ height: 100, width: 100 }} className={`ac-${icon} ac`}></div>)}
      </div>} trigger="click">
        <AntdButton
        customDisable
        // className={cn(
        //   this.props.active && styles.styleButtonActive,
        //   styles.styleButton,
        //   this.props.className && styles[this.props.className],
        //   // this.props.disabled && styles.styleButtonDisabled,
        // )}
        // onMouseDown={this.handleClick}
        >
          AC
        </AntdButton>
      </Popover>
    );
  }
}

const WysiwygInlineControls = ({
  buttons,
  disabled,
  editorState,
  handlers,
  onToggle,
  onToggleBlock,
  isAddAC
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = editorState.getCurrentInlineStyle();
  const acType = {
    label: 'ac',
    style: 'IMG',
    className: 'ac',
    hideLabel: true,
    handler: 'addContent',
    text: '![text](textToReplace)',
  };
  return (
    <Wrapper>
      {buttons.map(type => (
        <Button
          key={type.label}
          active={type.style === blockType || currentStyle.has(type.style)}
          className={type.className}
          disabled={disabled}
          handler={type.handler}
          handlers={handlers}
          hideLabel={type.hideLabel || false}
          label={type.label}
          onToggle={onToggle}
          onToggleBlock={onToggleBlock}
          style={type.style}
          text={type.text}
        />
      ))}
      { isAddAC &&
        <ACButton
          key={acType.label}
          active={acType.style === blockType || currentStyle.has(acType.style)}
          className={acType.className}
          disabled={disabled}
          handler={acType.handler}
          handlers={handlers}
          customDisable={true}
          hideLabel={acType.hideLabel || false}
          label={acType.label}
          onToggle={onToggle}
          onToggleBlock={onToggleBlock}
          style={acType.style}
          text={acType.text}
        />
      }
    </Wrapper>
  );
};

WysiwygInlineControls.defaultProps = {
  buttons: [],
  disabled: false,
  onToggle: () => { },
  onToggleBlock: () => { },
};

WysiwygInlineControls.propTypes = {
  buttons: PropTypes.array,
  disabled: PropTypes.bool,
  editorState: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  onToggleBlock: PropTypes.func,
};

export default WysiwygInlineControls;
