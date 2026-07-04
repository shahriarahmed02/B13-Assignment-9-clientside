const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content mt-auto">
            <nav className="grid grid-flow-col gap-4 text-base font-medium">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav> 
            <aside>
                <p className="text-sm">Copyright © {new Date().getFullYear()} - All right reserved by StudyNook Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;