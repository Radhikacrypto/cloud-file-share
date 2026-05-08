
import DashboardLayout from "../layout/DashboardLayout";
import {useEffect, useState} from "react";
import { File, FileIcon, FileText, Grid, Image, List, Music, Video } from "lucide-react";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import FileCard from "../components/FileCard.jsx";
import FileListRow from "../components/FileListRow.jsx";


const MyFiles=()=>{
    const [files, setFiles] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    const {getToken}=useAuth();

    const navigate=useNavigate();

    //fetching siles for logged in user 

    const fetchFiles= async()=>{
        try {
            const token= await getToken();
           const response= await axios.get('http://localhost:8080/api/v1.0/files/my',{headers: {Authorization: `Bearer ${token}`}});
           if (response.status === 200) {
            
                setFiles(response.data);
            }
        } catch (error) {
            console.error('Error fetching the files from server: ', error);
            toast.error('Error fetching the files from server: ', error.message);
        }
    }

    //Toggle the public private status
    const togglePublic = async (fileToUpdate) => {
        try {
            const token = await getToken();
            await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id), {}, {headers: {Authorization: `Bearer ${token}`}});
            console.log('data', fileToUpdate);
            setFiles(files.map((file) => file.id === fileToUpdate.id ? {...file, isPublic: !file.isPublic}: file));
        }catch (error) {
            console.error('Error toggling file status', error);
            toast.error('Error toggling file status: ', error.message);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [getToken]);

    const getFileIcon = (file) => {
        const extenstion = file.name.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extenstion)) {
            return <Image size={24} className="text-purple-500" />
        }

        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extenstion)) {
            return <Video size={24} className="text-blue-500" />
        }

        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extenstion)) {
            return <Music size={24} className="text-green-500" />
        }

        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extenstion)) {
            return <FileText size={24} className="text-amber-500" />
        }

        return <FileIcon size={24} className="text-purple-500" />
    }
    return(
        <DashboardLayout activeMenu="My Files">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My files {files.length}</h2>
                    <div className="flex items-center gap-3">
                        <List 
                        onClick={()=>setViewMode("list")}
                        size={24}
                        className={`cursor-pointer transition-colors ${viewMode === 'list' ? 'text-blue-600': 'text-gray-400 hover:text-gray-600'}`}/>

                        <Grid
                            size={24}
                            onClick={() => setViewMode("grid")}
                            className={`cursor-pointer transition-colors ${viewMode === 'grid' ? 'text-blue-600': 'text-gray-400 hover:text-gray-600'}`} />
                    </div>

                </div>

                {files.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
                        <File
                            size={60}
                            className="text-purple-300 mb-4"
                        />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            No files uploaded yet
                        </h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                            Start uploading files to see them listed here. you can upload
                            documents, images, and other files to share and manage them securely.
                        </p>
                        <button
                            onClick={() => navigate('/upload')}
                            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                            Go to Upload
                        </button>
                    </div>
                ): viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {files.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                onDelete={openDeleteConfirmation}
                                onTogglePublic={togglePublic}
                                onDownload={handleDownload}
                                onShareLink={openShareModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sharing</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {files.map((file) => (
                                    <FileListRow
                                        key={file.id}
                                        file={file}
                                        onDownload={handleDownload}
                                        onDelete={openDeleteConfirmation}
                                        onTogglePublic={togglePublic}
                                        onShareLink={openShareModal}
                                        getFileIcon={getFileIcon}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default MyFiles;