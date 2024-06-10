import { Image } from "antd";

const BASE_URL = "http://localhost:3001";

const Files = ({ files }) => (
  <div className="p-1 space-y-2">
    {files?.map((file) => (
      <div key={file.id} className="bg-gray-500 p-1">
        {file.fileType.startsWith("image/") ? (
          <Image
            src={`${BASE_URL}/${file.filePath}`}
            alt={file.filePath}
            width={300}
            height={300}
          />
        ) : (
          <a
            href={`${BASE_URL}/download/${file.filePath.split("\\")[2]}`}
            download
          >
            {file.origName}
          </a>
        )}
      </div>
    ))}
  </div>
);

export default Files;
