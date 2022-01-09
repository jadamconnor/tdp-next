import { useState } from 'react'
import axios from 'axios'

export default ({ jobOpening }) => {
    let jobLocations = []
    jobOpening[0].openingFields.location.map((el) => {
        jobLocations.push(el.location)
    })
    jobLocations = jobLocations.toString()
    let jobTitle = jobOpening[0].openingFields.jobTitle

    const[ resume, setResume ] = useState(null)
    const[ coverLetter, setCoverLetter ] = useState(null)
    const [gender, setGender] = useState('')
    const onChangeGender = e => {
        setGender(e.target.defaultValue)
    }
    const [race, setRace] = useState('')
    const onChangeRace = e => {
        setRace(e.target.defaultValue)
    }
    const [disVet, setDisVet] = useState('')
    const onChangeDisVet = e => {
        setDisVet(e.target.defaultValue)
    }
    const [disInd, setDisInd] = useState('')
    const onChangeDisInd = e => {
        setDisInd(e.target.defaultValue)
    }
    const[ validationErrors, setValidationErrors ] = useState()
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null },
    })
    const [inputs, setInputs] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        referrer: ''
    })

    const handleServerResponse = (ok, msg) => {
        if (ok) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: msg },
            })
            setInputs({
                fullName: '',
                phoneNumber: '',
                email: '',
                referrer: ''
            })
        } else {
            setStatus({
                info: { error: true, msg: msg },
            })
        }
    }

    const handleOnChange = (e) => {
        e.persist()
        setInputs((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }))
        validate()

        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null },
        })
    }

    const validate = () => {
        const errors = {}
        if (inputs.fullName === '') {
            errors.fullName = 'Please enter your name'
        }
        if (inputs.phoneNumber === '') {
            errors.phoneNumber = 'Please enter your phone number'
        }
        if (inputs.email === '') {
            errors.email = 'Please enter your email address'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputs.email)
        ) {
            errors.email = 'Invalid email address'
        }
        if (inputs.referrer === '') {
            errors.referrer = 'Please tell us how you heard about us'
        }
        if (!resume) {
            errors.resume = 'Please upload your resume'
        }
        if (!coverLetter) {
            errors.coverLetter = 'Please upload a cover letter'
        }
        return errors
    }

    const handleOnChangeResume = (e) => {
        e.persist()
        setResume(e.target.files[0])

        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null },
        })
    }

    const handleOnChangeCoverLetter = (e) => {
        e.persist()
        setCoverLetter(e.target.files[0])

        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null },
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('Job Title', jobTitle)
        formData.append('Job Location', jobLocations)
        formData.append('Resume', resume)
        formData.append('Cover Letter', coverLetter)
        formData.append('Name', inputs.fullName)
        formData.append('Phone Number', inputs.phoneNumber)
        formData.append('Email', inputs.email)
        formData.append('Referred By', inputs.referrer)
        formData.append('Gender', gender)
        formData.append('Race', race)
        formData.append('Disabled Vet', disVet)
        formData.append('Disabled Individual', disInd)
        setStatus((prevStatus) => ({ ...prevStatus, submitting: true }))
        Object.keys(validate()).length === 0 ?
            axios({
                method: 'POST',
                url: 'https://hooks.zapier.com/hooks/catch/11192970/b92hh7s/',
                data: formData
            })
            .then((response) => {
                handleServerResponse(
                    true,
                    'Success! Your application has been submitted.',
                    )
                })
                .catch((error) => {
                    handleServerResponse(false, error.response.data.error)
            })
        :
            handleServerResponse(false, 'Complete all required fields.')
            setValidationErrors(validate())
    }
    return (
        <div className='container mb-28 px-6 xl:px-0'>
            <main>
                <form onSubmit={handleOnSubmit} encType='multipart/form-data'>
                    <div className='flex flex-wrap justify-between'>
                        <div className='w-5/12'>
                            <div className='w-full mb-3'>
                                <div>
                                    <label className='text-lg text-justice-brown ml-3' htmlFor='fullName'>Full Name</label>
                                </div>
                                <div>
                                    <input
                                        className='h-12 w-full rounded-2xl bg-neutral-300 box-border px-3 appearance-none'
                                        id='fullName'
                                        type='text'
                                        name='fullName'
                                        onChange={handleOnChange}
                                        value={inputs.fullName}
                                    />
                                </div>
                                <div className='h-3'>
                                    {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.fullName}</span>}
                                </div>
                            </div>
                            <div className='w-full mb-3'>
                                <div>
                                    <label className='text-lg text-justice-brown ml-3' htmlFor='phoneNumber'>Phone Number</label>
                                </div>
                                <div>
                                    <input
                                        className='h-12 w-full rounded-2xl bg-neutral-300 box-border px-3 appearance-none'
                                        id='phoneNumber'
                                        type='tel'
                                        name='phoneNumber'
                                        onChange={handleOnChange}
                                        value={inputs.phoneNumber}
                                    />
                                </div>
                                <div className='h-3'>
                                    {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.phoneNumber}</span>}
                                </div>
                            </div>
                            <div className='w-full mb-3'>
                                <div>
                                    <label className='text-lg text-justice-brown ml-3' htmlFor='email'>Email</label>
                                </div>
                                <div>
                                    <input
                                        className='h-12 w-full rounded-2xl bg-neutral-300 box-border px-3 appearance-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                        id='email'
                                        type='email'
                                        name='email'
                                        onChange={handleOnChange}
                                        value={inputs.email}
                                    />
                                </div>
                                <div className='h-3'>
                                    {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.email}</span>}
                                </div>
                            </div>
                            <div className='w-full mb-3'>
                                <label className='text-lg text-justice-brown ml-3' htmlFor='referrer'>How did you hear about us?</label>
                                <select
                                    className='h-12 w-full rounded-2xl bg-neutral-300 box-border px-3 appearance-none'
                                    id='referrer'
                                    name='referrer'
                                    onChange={handleOnChange}
                                    value={inputs.referrer}
                                >
                                    <option value=''>Please select</option>
                                    <option value='Dept of Workforce Development'>Department of Workforce Development</option>
                                    <option value='Handshake'>Handshake</option>
                                    <option value='Indeed'>Indeed</option>
                                    <option value='Jobs That Help'>Jobs That Help</option>
                                    <option value='LinkedIn'>LinkedIn</option>
                                    <option value='Facebook'>Facebook</option>
                                    <option value='Twitter'>Twitter</option>
                                    <option value='Instagram'>Instagram</option>
                                    <option value='Other'>Other</option>
                                </select>
                                <div className='h-3'>
                                    {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.referrer}</span>}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8 w-full'>
                                <div>
                                    <div className='ml-3'>
                                        <label htmlFor='resume'>Resume:</label>
                                    </div>
                                    <input
                                        id='resume'
                                        type='file' 
                                        name='resume'
                                        onChange={handleOnChangeResume}
                                        hidden
                                    />
                                    <label className='flex justify-center items-center text-white bg-justice-blue rounded-2xl h-12 cursor-pointer' htmlFor='resume'>
                                        {resume ? <span>{resume.name.substring(0,25)}</span> : <span>UPLOAD FILE</span>}
                                    </label>
                                    <div className='h-3'>
                                        {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.resume}</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className='ml-3'>
                                        <label htmlFor='coverLetter'>Cover Letter:</label>
                                    </div>
                                    <input
                                        id='coverLetter'
                                        type='file' 
                                        name='coverLetter'
                                        onChange={handleOnChangeCoverLetter}
                                        hidden
                                    />
                                    <label className='flex justify-center items-center text-white bg-justice-blue rounded-2xl h-12 cursor-pointer' htmlFor='coverLetter'>
                                        {coverLetter ? <span>{coverLetter.name.substring(0,25)}</span> : <span>UPLOAD FILE</span>}
                                    </label>
                                    <div className='h-3'>
                                        {validationErrors && <span className='ml-3 text-red-800'>{validationErrors.coverLetter}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-5/12 text-justice-stone'>
                            <div className='text-lg mb-3'>
                                Equal Employment Opportunity Voluntary Self-Identification
                            </div>
                            <div className='text-sm mb-3'>
                                <p className='mb-3'>
                                    We are an equal opportunity employer and do not discriminate in hiring or employment on the basis of race, color, religion, sex, national origin, age, disability, or any other basis prohibited by federal, state, or local law. No question on this form is intended to secure information to be used for such discrimination.
                                </p>
                                <p className='mb-3'>
                                    We are required by federal regulations to report information as requested below. Your contribution of this information is completely voluntary. The information you provide is completely confidential and will be maintained separate from your personnel file and will not be used in a manner inconsistent with any applicable laws or regulations.
                                </p>
                            </div>
                            <div className='mb-1 mt-2 text-lg ' htmlFor='gender'>
                                Gender Identification (select only one)
                            </div>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='gender' value='female' onChange={(e) => onChangeGender(e)}/>
                                <label htmlFor='gender' className='text-sm'>Female</label>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='gender' value='male' onChange={(e) => onChangeGender(e)}/>
                                <span htmlFor='gender' className='text-sm'>Male</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='gender' value='non-binary' onChange={(e) => onChangeGender(e)}/>
                                <span htmlFor='gender' className='text-sm'>Non-binary</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='gender' value='did not disclose' onChange={(e) => onChangeGender(e)}/>
                                <span htmlFor='gender' className='text-sm'>I do not wish to disclose</span>
                            </label>
                            <div className='mb-1 mt-2 text-lg ' htmlFor='race'>
                                Race/Ethnic Identification
                            </div>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race'  value='African American or African' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>African American or African</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='American Indian/Alaskan Native' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>American Indian/Alaskan Native</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='Asian' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>Asian</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='Hispanic/Latino' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>Hispanic/Latino</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='Native Hawaiian or Other Pacific Islander' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>Native Hawaiian or Other Pacific Islander</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='White (Not of Hispanic Origin)' onChange={(e) => onChangeRace(e)}/>
                                <span className='text-sm'>White (Not of Hispanic Origin)</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='two or more races' onChange={(e) => onChangeRace(e)} />
                                <span className='text-sm'>Two or More Races (Not of Hispanic Origin)</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='race' value='did not disclose' onChange={(e) => onChangeRace(e)} />
                                <span className='text-sm'>I do not wish to disclose</span>
                            </label>
                            <div className='mb-1 mt-2 text-lg ' htmlFor='disabledVet'>
                                Disabled Veteran?
                            </div>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='disabledVet' value='yes' onChange={(e) => onChangeDisVet(e)}/>
                                <span className='text-sm'>Yes</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='disabledVet' value='no' onChange={(e) => onChangeDisVet(e)}/>
                                <span className='text-sm'>No</span>
                            </label>
                            <div>
                                <p>
                                    <i>
                                        NOTE: A 'Disabled Veteran' is an individual who is rated under Veterans Administration rules as having a disability of 30% or more, or a disability of 10% or 20% that qualified as a serious employment handicap, or has been released from active duty under a service connected disability.
                                    </i>
                                </p>
                            </div>
                            <div className='mb-1 mt-2 text-lg ' htmlFor='disabledIndividual'>
                                Disabled Individual?
                            </div>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='disabledIndividual' value='yes' onChange={(e) => onChangeDisInd(e)}/>
                                <span className='text-sm'>Yes</span>
                            </label>
                            <label className='flex items-center mb-1'>
                                <input type='radio' className='form-radio mr-1 focus:ring-1 focus:ring-white w-3.5 h-3.5 bg-neutral-300 border-0 text-justice-blue' name='disabledIndividual' value='no' onChange={(e) => onChangeDisInd(e)}/>
                                <span className='text-sm'>No</span>
                            </label>
                            <div>
                                <p>
                                    <i>
                                        NOTE: A disabled individual is defined as an individual who has a mental or physical impairment which substantially limits one or more major life activities, has a record of such impairment, or who is perceived as having such an impairment.
                                    </i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-12 mb-3'>
                        <button className='bg-justice-blue text-white text-sm font-bold rounded-lg py-3 px-6 tracking-wider' type='submit' disabled={status.submitting}>
                            {!status.submitting
                                ? !status.submitted
                                ? 'SUBMIT'
                                : 'SUBMITTED'
                                : 'SUBMITTING...'
                            }
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        {status.info.error && (
                            <div className='error'>Error: {status.info.msg}</div>
                        )}
                        {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
                    </div>
                </form>
            </main>
        </div>
    )
}