import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
import BScroll from 'better-scroll'
import Dialog from '../../Dialog';
import TouchFeedback from '../../TouchFeedback';
import config from '../../_util/config';
import { FullModalProps } from '../propsTyps';

export default class FullModal extends PureComponent<FullModalProps, any> {
    constructor( props ) {
        super( props );
    }

    static defaultProps = {
        prefixCls: `${config.cls}-full-modal`,
        style: {},
        visible: false,
        title: '',
        className: '',
        isUseBScroll: false,
        BScrollOpt: {},
        BScrollInitCallback: () => {}
    }

    private body: HTMLDivElement | null;

    componentDidMount() {
        this.initScroll();
    }

    initScroll() {
        const { isUseBScroll, BScrollOpt, BScrollInitCallback } = this.props;
        if ( this.body ) {
            if ( isUseBScroll ) {
                const scroll = new BScroll( this.body, BScrollOpt );
                BScrollInitCallback && BScrollInitCallback( scroll );
            }
        } else {
            requestAnimationFrame( () => {
                this.initScroll();
            } );
        }
    }

    createBScrollElem( children?: ReactNode ): ReactNode {
        const { prefixCls } = this.props;
        return (
            <div
                className={`${prefixCls}-body ${prefixCls}-wrapper`}
                ref={
                    ( elem ) => {
                        this.body = elem;
                    }
                }
            >
                <div
                    className={`${prefixCls}-wrapper-content`}
                >
                    {children}
                </div>
            </div>
        );
    }

    createDefaultElem( children?: ReactNode ): ReactNode {
        const { prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-body`}>
                {children}
            </div>
        );
    }

    render() {
        const {
            children,
            prefixCls,
            className,
            style,
            visible,
            title,
            closeCallback,
            isUseBScroll
        } = this.props;

        if ( visible ) {
            return (
                <Dialog
                    visible={visible}
                    style={style}
                    className={`${className}`}
                    transparent
                    boxClassName={`${prefixCls}-box`}
                >
                    <div className={classNames( `${prefixCls}-content`, className )}>
                        <div className={`${prefixCls}-head`}>
                            <h5>{title}</h5>
                        </div>
                        {isUseBScroll ? this.createBScrollElem( children ) : this.createDefaultElem( children )}
                        <div className={`${prefixCls}-footer`}>
                            <TouchFeedback
                                activeClassName={`${prefixCls}-btn-active`}
                                onTouchEnd={( event ) => {
                                    closeCallback();
                                    event.preventDefault();
                                }}
                            >
                                <div className={`${prefixCls}-btn`}>
                                    <span />
                                </div>
                            </TouchFeedback>
                        </div>
                    </div>
                </Dialog>
            );
        }
        return null;
    }
}

