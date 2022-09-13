import { BsTwitter, BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://twitter.com/garbakolameen">
        <BsTwitter onClick={() => {}} />
        </a>
      </div>

      <div>
        <a href="https://web.facebook.com/garba.kolapo/">
        <BsFacebook onClick={() => {}} />
        </a>
      </div>

      <div>
        <a href="https://www.linkedin.com/in/ameen-garba-42b914a3/">
        <BsLinkedin onClick={() => {}} />
        </a>
      </div>

      <div>
        <a href="https://wa.me/message/SITRB3VPVQDGJ1">
        <BsWhatsapp onClick={() => {}} />
        </a>
      </div>
    </div>
  )
}

export default SocialMedia
