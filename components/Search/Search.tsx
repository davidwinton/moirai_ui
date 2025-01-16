import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchResult from 'components/SearchResult/SearchResult';
import { HarmonicResponse } from 'types/harmonicResponse';
import { TextField } from "components/subframe/components/TextField";

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<HarmonicResponse[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);

    // Elasticsearch endpoint and index
    const ELASTICSEARCH_URL = 'https://your-elasticsearch-domain.com';
    const INDEX_NAME = 'your-index';

    const searchElasticsearch = async (searchQuery: string) => {
        // try {
        //   const response = await axios.post(`${ELASTICSEARCH_URL}/${INDEX_NAME}/_search`, {
        //     size: 5, // Limit results to top 5 matches
        //     query: {
        //       multi_match: {
        //         query: searchQuery,
        //         fields: ['name^2', 'website'], // Boost "name" field with ^2
        //       },
        //     },
        //   });
        //   setResults(
        //     response.data.hits.hits.map((hit: any) => ({
        //       id: hit._id,
        //       name: hit._source.name,
        //       website: hit._source.website,
        //     }))
        //   );
        // } catch (error) {
        //   console.error('Error fetching Elasticsearch results:', error);
        // }
        if (searchQuery.toLowerCase().startsWith('eth')) {
            const companyList = [18656035, 1370007]
            const responses = await Promise.all(companyList.map((companyId) => {
                return axios.get(`/api/harmonic_company/${companyId}`);
            }));
            const combinedList = responses.map((response) => response.data);
            setResults(combinedList);

        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            if (value.trim()) {
                searchElasticsearch(value.trim());
            } else {
                setResults([]);
            }
        }, 300); // Debounce delay (300ms)
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 200); // Delay to allow clicks on results
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <div className="relative">
            {/* Search Box */}
            {/* <TextField
            className="h-auto grow shrink-0 basis-0"
            variant="filled"
            label=""
            helpText=""
            icon="FeatherSearch"
            
          >
            <TextField.Input placeholder="Quick Search" />
          </TextField> */}
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quick Search..."
            />

            {/* Results Dropdown */}
            {isFocused && results.length > 0 && (
                <div className="absolute left-0 top-full w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <ul>
                        {results.map((result) => (
                            <li
                                key={result.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <SearchResult key={result.id} company={result}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
