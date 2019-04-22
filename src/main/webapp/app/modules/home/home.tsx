import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { clearCourses, getCourses } from 'app/shared/reducers/course';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  getAllCourses = () => {
    this.props.getCourses();
  };

  clearAllCourses = () => {
    this.props.clearCourses();
  };

  render() {
    let { account, courses, showCourse } = this.props;
    console.log(showCourse);
    return (
      <Row>
        <Col md="9">
          <h2>Welcome, 九章全栈ReactSpring项目!</h2>
          <p className="lead">This is your homepage</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
              <button className="btn btn-primary" onClick={this.getAllCourses}>
                显示所有课程
              </button>{' '}
              <button onClick={this.clearAllCourses} className="btn btn-primary">
                清除
              </button>
              {courses &&
                courses.map(course => (
                  <div className="courseOutterTable">
                    <div className="courseInnerTable">{course.courseName}</div>
                    <div>{course.courseLocation}</div>
                    <div>{course.courseContent}</div>
                    <div>{course.teacherName}</div>
                    <button>注册课程</button>
                    <button>删除课程</button>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  courses: storeState.course.courses,
  showCourse: storeState.course.showCourse
});

const mapDispatchToProps = { getSession, getCourses, clearCourses };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
