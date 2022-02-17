import './profile.css';
import { FaEnvelope, FaMobileAlt, FaMapMarkerAlt, FaHome, FaRegCalendarAlt, FaRegBookmark, FaRegMoneyBillAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="profile-page-container">
        <div className="profile-page">
        <svg
                className="profile-page__background-svg"
                width="479.51715"
                height="613.1131"
                viewBox="0 0 126.87225 162.21951"
                preserveAspectRatio="none"
              >
                <g transform="translate(-0.01338979,-81.822661)">
                  <path
                    d="M -0.02748792,0.09204891 0.06179782,268.57391 c 0.2522457,18.08349 7.57416788,36.01931 14.71456518,52.63532 14.127795,32.87596 40.670217,59.23433 70.693359,78.70313 49.267138,31.94774 107.691868,46.70131 165.714838,55.71484 43.88538,6.81734 89.41321,10.97853 129.63672,29.16714 35.09117,15.74206 51.11257,32.87572 62.55433,46.85797 16.32669,19.95181 36.00661,81.19173 36.19216,81.19222 0,-211.16182 -0.0239,-392.22488 -0.0239,-613.11269694 -151.61719,0 -310.93915,-0.004327 -479.57138792,0.36021585 z"
                    transform="matrix(0.26458333,0,0,0.26458333,0,81.893728)"
                  />
                </g>
              </svg>
            <div className="top-section">
                <div className='profile-image'>
                    <img className='img-circle' src="https://res.cloudinary.com/kartikeyvaish/image/upload/v1642841457/Kolegia/logo_snpqqs.png" alt="User" />
                </div>
                <div className='user_name'>Vikas Mishra</div>
                <div className="contact_details">
                  <span className="email"><FaEnvelope /> vikas232@gmail.com</span>
                  <span className="phone_no"><FaMobileAlt /> +916378xxxxxxxxxx</span>
                </div>
              </div>
              <div className="bottom-section">
                <div className='leftpart'>
                  <div className="profile-page__field">
                    <span className="more_details"><FaRegCalendarAlt /> Year: 2019</span>
                  </div>
                  <div className="profile-page__field">
                    <span className="more_details"><FaRegBookmark /> Batch: IMT</span>
                  </div>
                  <div className="profile-page__field">
                    <span className="more_details"><FaRegMoneyBillAlt /> Roll No.- 2019IMT109</span>
                  </div>
                </div>
                <div className='rightpart'>
                  <div className="profile-page__field">
                    <span className="more_details"><FaHome /> Hostel: BH1</span>
                  </div>
                  <div className="profile-page__field">
                    <span className="more_details"><FaMapMarkerAlt /> Room No.: 409</span>
                  </div>
                </div>
            </div>
            <div className="profile-page__btn">
                  <button className="edit_details">Edit Details</button>
            </div>
        </div>
    </div>
  )
}

export default Profile