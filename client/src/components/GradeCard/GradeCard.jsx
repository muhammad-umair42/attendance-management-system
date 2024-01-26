/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import makeApiRequest from '../../api/axios';
import './GradeCard.css';

const GradeCard = ({ userId }) => {
  const [grade, setGrade] = useState(false);

  useEffect(() => {
    const handleGradeShow = async () => {
      const reqParams = {
        url: `/grade/${userId}`,
        method: 'get',
        reqType: 'getusergrade',
      };

      const { success, resData } = await makeApiRequest(reqParams);

      setGrade(resData);
    };

    userId && setTimeout(handleGradeShow, 3000);
  }, []);

  return (
    <>
      {grade ? (
        <div className="user__grade-card">
          <h3>Grade Card</h3>
          <div className="grade-card__wrapper">
            <div className="grade-card__grade">
              <span>{grade?.grade}</span>
              <span>
                {grade?.month} {grade?.year}
              </span>
            </div>

            <div className="grade-card__stats">
              <div className="grade-card__stats-box">
                <div className="box__div">
                  <span>For: </span>
                  <span>
                    {grade?.month} {grade?.year}
                  </span>
                </div>
                <div className="box__div">
                  <span>Last Updated:</span>
                  <span>{grade?.date}</span>
                </div>
              </div>

              <div className="grade-card__stats-box">
                <div className="box__div">
                  <span>Presents:</span>
                  <span>{grade?.presents}</span>
                </div>
                <div className="box__div">
                  <span>Leaves:</span>
                  <span>{grade?.leaves}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Grades are not Announced Yet.</h3>
      )}
    </>
  );
};

export default GradeCard;
