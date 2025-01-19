import Repo from "./Repo";

const Repos = ({ repos }) => {
    return (
        <div className="lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6">
            {repos?.length > 0 ? (
                <ol className="relative border-s border-gray-200">
                    {repos.map(each => (
                        <Repo key={each.id} repo={each} />
                    ))}
                </ol>
            ) : (
                <p className="flex items-center justify-center h-32">No repositories found.</p>
            )}
        </div>
    );
};

export default Repos;