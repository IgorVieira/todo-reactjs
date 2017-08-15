import React,  { Component } from 'react'
import PropTypes from 'prop-types'

export class Link extends Component{
    /*eslint no-restricted-globals: ["error", "event"]*/

    handleClick = (evt) => {
        evt.preventDefault()
        history.pushState(null, '', this.props.to)
    }
    
    render() {
        return <a onClick={this.handleClick}>{this.props.children}</a>
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired
}