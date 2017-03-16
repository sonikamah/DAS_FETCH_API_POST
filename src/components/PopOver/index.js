import React from 'react';

const propTypes = {
    isOpen: React.PropTypes.bool,

    // Sets the direction the Popover is positioned towards.
    direction: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,

    triggerNode: React.PropTypes.object.isRequired
};

class PopOver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverOffset: {}
        }
        this.calculateOffset = this.calculateOffset.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        if (this.props.isOpen) {
            document.addEventListener('mousedown', this.handleClickOutside);
            window.addEventListener('resize', this.props.hideComponent);
            this.setState({ popoverOffset: this.calculateOffset(this.props.triggerNode) });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener('resize', function() {
            console.log('Remove resize')
        });
    }

    /**
    *  if clicked on outside of element
    */
    handleClickOutside(event) {
        if(this.props.triggerNode === event.target){
                return;
            } 

        if ((this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.isOpen)) {
            this.props.hideComponent();
        }        
    }

    calculateOffset(triggerNode) {
        const popOverContentNode = this.wrapperRef;
        const placement = this.getPlacement(popOverContentNode);
        const position = this.getPosition( placement, popOverContentNode, triggerNode);
        popOverContentNode.classList.add(placement);
        return { left: position.left, top: position.top };
    }

    static getViewPortPos() {
        const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return { width, height };
    }

    getPlacement = (popOverContentNode) => {
        const viewPort = PopOver.getViewPortPos();
        const popoverProperty = popOverContentNode.getBoundingClientRect(); // left, top, bottom , width , height
        let placement = this.props.direction || 'top';

        if (placement === 'top' && (popoverProperty.top + popoverProperty.height < 0)) {
            placement = 'bottom';
        } else if (placement === 'bottom' && (popoverProperty.top + popoverProperty.height > viewPort.height)) {
            placement = 'top';
        } else if (placement === 'right' && (popoverProperty.left + popoverProperty.width > viewPort.width)) {
            placement = 'left';
        } else if (placement === 'left' && (popoverProperty.left < 0)) {
            placement = 'right';
        }
        return placement;
    }

    getPosition = (placement, contentNode, triggerNode) => {
        if (placement === 'top') {
            return { left: -1 * (contentNode.offsetWidth / 2 - triggerNode.offsetWidth / 2) + triggerNode.offsetLeft, top: -1 * (contentNode.offsetHeight) + triggerNode.offsetTop};
        } else if (placement === 'bottom') {
            return { left: -1 * (contentNode.offsetWidth / 2 - triggerNode.offsetWidth / 2) + triggerNode.offsetLeft, top: (triggerNode.offsetHeight) + triggerNode.offsetTop};
        } else if (placement === 'left') {
            return { left: contentNode.offsetWidth * -1 + triggerNode.offsetLeft, top: -1 * (contentNode.offsetHeight / 2 - triggerNode.offsetHeight / 2) + triggerNode.offsetTop};
        } else 
        // If placement is right
        return { left: triggerNode.scrollWidth + triggerNode.offsetLeft, top: -1 * (contentNode.offsetHeight / 2 - triggerNode.offsetHeight / 2) + triggerNode.offsetTop};
    }

    render() {
        const { isOpen, direction, triggerNode, hideComponent } = this.props;
        const displayClass = isOpen ? 'show' : 'hidden';
        return (
            <div className={ "popover-content" + ' ' + displayClass + ' ' + this.state.actualPlacement} 
                style= { this.state.popoverOffset}
                ref={(node) => { this.wrapperRef = node } }>
            { this.props.children }
            </div>
        )
    }
}

PopOver.propTypes = propTypes;

export default PopOver;