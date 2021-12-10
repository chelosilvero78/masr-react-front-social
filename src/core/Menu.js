import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
//Multilenguaje--------------------
import LenguageSelect from '../lang/components/LenguageSelect'
import { useTranslation } from 'react-i18next'




const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => {
    const { t } = useTranslation()
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">
                        {t('Home')}
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                        to="/users"
                    >
                        {t('Users')}
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                        {t('Create Post')}
                    </Link>
                </li>

                {!isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                                {t('Sign In')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                                {t('Sign Up')}
                            </Link>
                        </li>
                    </React.Fragment>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                    <li className="nav-item">
                        <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                            {t('Admin')}
                        </Link>
                    </li>
                )}

                {isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                            {t('Find People')}
                        </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to={`/user/${isAuthenticated().user._id}`}
                                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                                className="nav-link"
                            >
                                {`${isAuthenticated().user.name}'s profile`}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => signout(() => history.push('/'))}
                            >
                                {t('Sign Out')}
                        </span>
                        </li>
                    </React.Fragment>
                )}
                <div className="d-flex justify-content-end align-items-center language-select-root">
                    <LenguageSelect />
                </div>
            </ul>
        </div>
    )
};

export default withRouter(Menu);
