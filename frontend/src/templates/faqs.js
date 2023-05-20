import React from 'react'
import './faqs.css';

function Faqs() {
    return (
        <div className='faqsContainer'>
            <h1>Frequently Asked Questions</h1>
            <div className="qnaContainer">
                <div className="question">Q: How do I create an account on CareerMeet?</div>
                <div className="answer"> To create an account on CareerMeet, simply click on the "Sign Up" button on the homepage and fill out the registration form with your details. Once completed, click "Register" to create your account.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: Can I search for jobs without creating an account?</div>
                <div className="answer"> Yes, you can search for jobs on CareerMeet without creating an account. However, to apply for jobs or save your job preferences, you will need to create an account.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: How do I post a job listing on CareerMeet?</div>
                <div className="answer"> To post a job listing, you need to have an employer account. Log in to your employer account and navigate to the "Post a Job" section. Fill out the job details and click "Submit" to post your job listing on CareerMeet.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: How do I edit or delete my job listing?</div>
                <div className="answer"> To edit or delete a job listing, log in to your employer account and go to the "Manage Jobs" section. From there, you can edit or delete any of your posted job listings.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: Can I upload my resume on CareerMeet?</div>
                <div className="answer"> Yes, as a job seeker, you can upload your resume to CareerMeet. Once you have created an account, go to your profile and click on the "Upload Resume" button to upload your resume.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: How can I contact a job poster or an applicant?</div>
                <div className="answer"> To contact a job poster or an applicant, log in to your account and go to the job listing or application details page. You will find contact information or a messaging feature to communicate with the relevant party.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: Is CareerMeet free to use?</div>
                <div className="answer"> CareerMeet offers both free and premium features. Basic usage of the platform, such as job search and resume upload, is free. However, certain advanced features and services may require a paid subscription.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: How can I reset my password?</div>
                <div className="answer"> If you have forgotten your password, click on the "Forgot Password" link on the login page. Follow the instructions to reset your password via the email associated with your account.</div>
            </div>
            <div className="qnaContainer">
                <div className="question">Q: How can I delete my CareerMeet account?</div>
                <div className="answer"> To delete your CareerMeet account, log in and go to your account settings. Look for the "Delete Account" option and follow the provided instructions to permanently delete your account.</div>
            </div>
        </div>
    )
}

export default Faqs;