import React from 'react';
import style from './index.less';
import { Loading } from '@/components/Loading';
import { RatingConfig, fetchRatingList } from './model';
import { GithubIcon, RightArrowIcon } from '@/icons';

class Index extends React.Component {
    async componentWillMount() {
        const ratingList: any = await fetchRatingList();
        if (ratingList !== null) {
            this.setState({
                loaded: true,
                ratingList: ratingList,
            });
        }
    }

    constructor(props: any) {
        super(props);
    }

    state = {
        loaded: false,
        ratingList: [],
    };

    render() {
        return (
            <div className={style.root}>
                <div className={style.inner}>
                    {this.state.loaded === false && (
                        <div className={style.loading}>
                            <Loading />
                        </div>
                    )}

                    {this.state.loaded === true && (
                        <>
                            <div
                                className={style['border-bottom']}
                                style={{ display: 'flex', marginTop: '20px' }}
                            >
                                <div style={{ float: 'left' }}>
                                    <a
                                        className={[
                                            style.go,
                                            style['MuiButtonBase-root'],
                                            style['MuiIconButton-root'],
                                        ].join(' ')}
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://github.com/XCPCIO/XCPCIO-rating"
                                        title="Github"
                                    >
                                        <span
                                            className={
                                                style['MuiIconButton-label']
                                            }
                                        >
                                            <GithubIcon />
                                        </span>
                                        <span
                                            className={
                                                style['MuiTouchRipple-root']
                                            }
                                        ></span>
                                    </a>
                                </div>
                                <div style={{ flex: '1' }}></div>
                                <div style={{ float: 'right' }}></div>
                            </div>

                            {this.state.ratingList.map(
                                (rating: RatingConfig, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className={style['m-box']}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    paddingBottom: '0px',
                                                    paddingTop: '10px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        float: 'left',
                                                        textAlign: 'left',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            style['m-title']
                                                        }
                                                    >
                                                        {rating.name}
                                                    </div>
                                                </div>
                                                <div
                                                    style={{ flex: '1' }}
                                                ></div>
                                                <div style={{ float: 'right' }}>
                                                    <a
                                                        className={[
                                                            style.go,
                                                            style[
                                                                'MuiButtonBase-root'
                                                            ],
                                                            style[
                                                                'MuiIconButton-root'
                                                            ],
                                                        ].join(' ')}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={rating.link}
                                                        style={{}}
                                                    >
                                                        <span
                                                            className={
                                                                style[
                                                                    'MuiIconButton-label'
                                                                ]
                                                            }
                                                        >
                                                            <RightArrowIcon />
                                                        </span>
                                                        <span
                                                            className={
                                                                style[
                                                                    'MuiTouchRipple-root'
                                                                ]
                                                            }
                                                        ></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Index;
