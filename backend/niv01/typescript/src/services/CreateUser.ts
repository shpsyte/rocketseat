/**
 * 
 * @param params name: Nome, email: Email, passqoed: Hash
 */

 interface TechObject {
    title: string;
    experience: number
 }

 interface CreateUserDate {
   name ?: string;
   email: string;
   password: string | number;
   techs: Array<string | TechObject>
 }

export default function CreateUser({name, email, password, techs}: CreateUserDate) {
   const user = {
      name, email, password, techs
   }

   return user;
}