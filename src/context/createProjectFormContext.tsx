import { createContext, useState, ReactNode } from 'react';
import AddProjectReqApi from '../../api/projectDev/projects/addProject';
import { AddImageReqApi } from '../../api/projectDev/projects/addImage';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const CreateProjectFormContext = createContext({
    name: '' as string,
    saveName: (name: any) => { },
    shortDescription: '',
    saveShortDescription: (shortDescription: any) => { },
    description: '',
    saveDescription: (description: any) => { },
    image: 'image null',
    saveImage: (image: any) => { },
    imageUrl: '',
    saveImageUrl: (imageUrl: any) => { },
    isOnLineProject: false,
    saveIsOnLineProject: (statusProject: boolean) => { },
    isSearchPersonn: false,
    saveIsSearchPersonn: (statusSearchPersonn: boolean) => { },
    VerifyIsCompleteForm: () => { },
    isComplete: false,
    registerProject: () => { },
});

export const CreateProjectFormProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('image null');
    const [imageUrl, setImageUrl] = useState(`${urlApiNest}/project/project-image/switch3415c855-02fc-4371-9154-730beeb60595.png`);
    const [isOnLineProject, setIsOnLineProject] = useState(false);
    const [isSearchPersonn, setIsSearchPersonn] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const saveName = (name: any) => {
        setName(name);
    };

    const saveShortDescription = (shortDescription: any) => {
        setShortDescription(shortDescription);
    };

    const saveDescription = (description: any) => {
        setDescription(description);
    };

    const saveImage = (image: any) => {
        setImage(image);
    };

    const saveImageUrl = (imageUrl: any) => {
        setImageUrl(imageUrl);
    };

    const saveIsOnLineProject = (statusProject: any) => {
        setIsOnLineProject(statusProject);
    };

    const saveIsSearchPersonn = (statusSearchPersonn: any) => {
        setIsSearchPersonn(statusSearchPersonn);
    };
    
    const VerifyIsCompleteForm = () => {
        if (name != '' && shortDescription != '' && description.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
            setIsComplete(true);
        }
        else {
            setIsComplete(false);
        }
    };

    const registerProject = async () => {
        // recuperation des données du formulaire pour les formater
        let formDataProject = {
            name: name,
            shortDescription: shortDescription,
            description: description,
            isOnLineProject: isOnLineProject,
            isSearchPersonn: isSearchPersonn,
            age: 22
        }
        // envoie des données au serveur
        const newProject = await AddProjectReqApi(JSON.stringify(formDataProject));
        if (newProject) {
            if (imageUrl !== `${urlApiNest}/project/project-image/switch3415c855-02fc-4371-9154-730beeb60595.png`) {
                const imageToBdd = await AddImageReqApi(image, newProject.id)
                return  imageToBdd;
            }
        }
    };

    const context = {
        name,
        saveName,
        shortDescription,
        saveShortDescription,
        description,
        saveDescription,
        image,
        saveImage,
        imageUrl,
        saveImageUrl,
        isOnLineProject,
        saveIsOnLineProject,
        isSearchPersonn,
        saveIsSearchPersonn,
        isComplete,
        VerifyIsCompleteForm,
        registerProject,
    };
    return (
        <CreateProjectFormContext.Provider value={context}>
            {children}
        </CreateProjectFormContext.Provider>
    );
};