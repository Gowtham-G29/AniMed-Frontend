import axios from 'axios';


const BASE_URL = `https://animed-backend.onrender.com`;


export const login = async (inputs) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/users/login`, inputs, {
      withCredentials: true
    });
    return response;

  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'login failed');
  }
}


export const signup = async (inputs) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/signup`,
      {
        name: inputs.name,
        email: inputs.email,
        role: inputs.role,
        password: inputs.password,
        passwordConfirm: inputs.passwordConfirm,
      },
      {
        withCredentials: true,
      }
    );

    return response;

  } catch (err) {
    throw new Error(err.response?.data?.message || 'Signup failed');
  }
};


export const userDetailsRegister = async (inputs) => {
  try {

    const response = await axios.post(
      `${BASE_URL}/api/v1/users/userDetailsRegister`,
      {
        Name: inputs.Name,
        contactNumber: inputs.contactNumber,
        telephoneNumber: inputs.telephoneNumber,
        contactEmail: inputs.contactEmail,
        Address: inputs.Address,
        country: inputs.Country,
        state: inputs.State,
        district: inputs.District,
        pincode: inputs.Pincode,
        photo: inputs.photo || null,
      },
      { withCredentials: true }
    );



    return response;
  } catch (error) {

    throw new Error(error);
  }
};


export const vetDoctorDetailsRegister = async (inputs) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/vetDoctorDetailsRegister`,
      {
        fullName: inputs.fullName,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        licenseNumber: inputs.licenseNumber,
        specialization: inputs.specialization,
        experience: inputs.experience,
        clinicName: inputs.clinicName,
        clinicAddress: inputs.clinicAddress,
        preferredLanguage: inputs.preferredLanguage,
        state: inputs.state,
        district: inputs.district,
        pincode: inputs.pincode,
        country: inputs.country,
        geolocation: {
          longitude: inputs.longitude,
          latitude: inputs.latitude,
        }


      },

      {

        withCredentials: true,
      }
    );


    return response;

  } catch (error) {

    console.log(error)

    throw new Error(error);

  }
};


export const animalDetailsRegister = async (inputs) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/animals/animalDetailsRegister`,
      inputs,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {

    console.log(error);
  }
};

export const accountDeactivate = async () => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/users/deleteMe`, {}, { withCredentials: true });
    return response;

  } catch (error) {
    throw new Error(error);

  }
}

export const getAnimalOwnerDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getAnimalOwner`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/users/logout`, {
      withCredentials: true
    });

    return response;

  } catch (error) {

    return error;

  }
}


export const getAnimalDetails = async () => {
  try {

    const response = await axios.get(`${BASE_URL}/api/v1/animals/getAnimals`, {
      withCredentials: true
    });
    return response;

  } catch (error) {
    return error;
  }
};

export const deleteAnimal = async (animalID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/animals/deleteAnimal`, {
      data: { animalID },
      withCredentials: true
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAnimal = async (inputs) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/animals/updateAnimal`, inputs, {
      withCredentials: true
    });

    return response;

  } catch (error) {
    return error;
  }
};

export const getNearByDoctors = async (animalOwnerID) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getNearByDoctors`, {
      params: { userID: animalOwnerID },
      withCredentials: true
    });
    return response;
  } catch (err) {

    return err;
  }
};

export const deactivateAccount = async () => {
  try {

    const response = await axios.patch(`${BASE_URL}/api/v1/users/deleteMe`, {}, {
      withCredentials: true
    });


    return response;

  } catch (error) {

    return error;
  }
};


export const updateProfile = async (formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/users/updateMe`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, withCredentials: true
    })


    return response;


  } catch (error) {

    return error;

  }
}

export const updateCurrentUserPassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/users/updateCurrentUserPassword`, {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword
    }, { withCredentials: true });
    return response;

  } catch (error) {

    return error

  }
};

export const getNearbyAnimals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getNearbyAnimals`, {
      withCredentials: true
    });


    return response;
  } catch (error) {

    return error;

  }
}

export const updateDoctorSuggestions = async (inputs) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/animals/updateDoctorSuggestions`,
      {
        animalID: inputs.animalID,
        doctorSuggestedStatus: inputs.doctorSuggestedStatus,
        doctorSuggestions: {
          medicine: inputs.medicine,
          preventionMethods: inputs.preventionMethods,
          remarks: inputs.remarks,
          suggestedBy: inputs.suggestedBy,
        },

      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.error("Error updating doctor suggestions:", error.response?.data || error.message);
    throw error;
  }
};


export const getDoctorDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getDoctorDetails`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error(error);
  }
};

export const getAnimalOwnerContacts = async (animalID) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getAnimalOwnerContacts`, {
      params: { _id: animalID },
      withCredentials: true
    });

    return response;

  } catch (error) {

    return error;

  }
}

export const getVetDoctorDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getVetDoctorDetails`, {
      withCredentials: true
    });

    return response;

  } catch (error) {

    return error;

  }
};


export const autoLogin = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/autoLogin`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response;

  } catch (error) {

    return error;

  }
}

export const getRole = async (userID) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/getRole`, {
      params: { _id: userID }
    });

    return response;

  } catch (error) {

    return error;

  }
}

export const approveDoctors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/approveDoctors`);
    return response;

  } catch (error) {

    return error;

  }
}

export const activateDoctor = async (userID) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/users/activateDoctor`, {
      _id: userID
    });

    return response;

  } catch (error) {

    return error;

  }
};

export const updateDiseaseInformation = async (inputs) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/diseaseInformation/updateDiseaseInformation`,
      inputs
    )
    return response;

  } catch (error) {
    return error;

  }
};

export const getDiseaseInfo = async (disease) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/diseaseInformation/getDiseaseInfo`, {
      params: {
        diseaseName:disease
      }
    })
    return response;

  } catch (error) {

    console.log(error)

    return error;

  }
}

getDiseaseInfo('Anthrax');








