import mongoose from 'mongoose';
import User from './models/User.js';


const seedDoctors = async () => {
    try {
        await User.deleteMany({ role: "doctor"});
    
        const doctors = [
            {
                email: "dr.sumathi@test.com",
                password: "doctorSumathi123",
                firstName: "Sumathi",
                specialization: "Cardiologist",
                experience: 10,
                availability: ["Monday", "wednesday", "friday"]
            },
            {
                email: "dr.ramesh@test.com",
                password: "doctorRamesh123",
                firstName: "Ramesh",
                specialization: "Neurologist",
                experience: 8,
                avilability: ["Tuesday", "Thursday", "Saturday"]
            },
            {
                email: "dr.neha@test.com",
                password: "doctorNeha123",
                firstName: "Neha",
                specialization: "Pediatrician",
                experience: 5,
                avilability: ["Monday", "Wednesday", "Friday"]
            },
            {
                email: "dr.gaana@test.com",
                password: "doctorGaana123",
                firstName: "Gaana",
                specialization: "Dermatologist",
                experience: 7,
                avilability: ["Monday", "Wednesday", "Friday"]
            },
            {
                email: "dr.vinaya@test.com",
                password: "doctorVinaya123",
                firstName: "Vinaya",
                specialization: "Orthopedic",
                experience: 6,
                avilability: ["Tuesday", "Thursday", "Saturday"]
            },
            {
                email: "dr.hithesh@test.com",
                password: "doctorHithesh123",
                firstName: "Hithesh",
                specialization: "Oncologist",
                experience: 9,
                avilability: ["Monday", "Wednesday", "Friday"]
            }
        ];

        for(let doc of doctors){
            const user = new User({email: doc.email, password:doc.password, role:"doctor"});
            await user.save();

            console.log(`doctor created: ${doc.firstName} ${doc.lastName}`);
        }
        console.log("doctors seeded");
        process.exit(0);

    }catch (error) {
        console.error("seed error", error);
        process.exit(1);
    }
};


mongoose.connect('mongodb://127.0.0.1:27017/hospital-management')
  .then(() => {
    console.log(' MongoDB connected');
    seedDoctors();
  })
  .catch(err => {
    console.error(' MongoDB failed:', err.message);
    process.exit(1);
  });